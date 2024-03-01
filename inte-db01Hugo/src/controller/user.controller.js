const User = require('../model/user.model.js');
const Admin = require('../model/admin.model.js');
const { authenticate } = require('../utils/auth.utils');
const Device = require('../model/device.model.js'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;

// En admin.controller.js y user.controller.js
const { login } = require('../utils/auth.utils.js');

// Usar login donde necesites realizar la operación de inicio de sesión.


const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    savedUser.password = undefined; // No devolver la contraseña

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const loginUser = async (req, res) => {
  try {
    // Asume que authenticate ahora espera solo un modelo relevante según el tipo de login
    const { token, role } = await authenticate(req.body.email, req.body.password, User);
    res.json({ message: 'User logged in successfully', token, role });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Hashear nueva contraseña si se está actualizando
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    updatedUser.password = undefined; // No devolver la contraseña
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const deleteUser = async (req, res) => {
  try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
          return res.status(404).send('User not found');
      }

      res.json({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send('User not found');
      }

      res.json(user);
  } catch (error) {
      res.status(500).send(error.message);
  }
};


const getUsers = async (req, res) => {
  try {
      const users = await User.find({});
      res.json(users);
  } catch (error) {
      res.status(500).send(error.message);
  }
};

const acceptMonitoringRequest = async (req, res) => {
  const { adminId } = req.body; // ID del admin que envió la solicitud
  const userId = req.user._id; // Asume autenticación del usuario

  try {
      // Actualizar el estado de la solicitud en el Admin
      const admin = await Admin.findOneAndUpdate(
          { "_id": adminId, "sentMonitoringRequests.userId": userId },
          { "$set": { "sentMonitoringRequests.$.status": 'accepted' } },
          { new: true }
      );

      if (!admin) {
          return res.status(404).send('Administrador no encontrado o solicitud no existe.');
      }

      // Opcional: Actualizar el modelo de User para reflejar la aceptación, si es necesario

      res.status(200).send('Solicitud aceptada correctamente.');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al aceptar la solicitud de monitoreo.');
  }
};


const rejectMonitoringRequest = async (req, res) => {
  const { adminId } = req.body; // ID del admin que envió la solicitud
  const userId = req.user._id; // Asume autenticación del usuario

  try {
      // Encuentra el admin y actualiza el estado de la solicitud a 'rejected'
      const admin = await Admin.findOne({
          _id: adminId,
          'sentMonitoringRequests.userId': userId
      });

      if (!admin) {
          return res.status(404).send('Administrador no encontrado.');
      }

      // Busca la solicitud específica y actualiza su estado a 'rejected'
      const requestIndex = admin.sentMonitoringRequests.findIndex(request => request.userId.equals(userId));
      if (requestIndex === -1) {
          return res.status(404).send('Solicitud no encontrada.');
      }

      // Asegurándose de que la solicitud no haya sido previamente aceptada o rechazada
      if (admin.sentMonitoringRequests[requestIndex].status !== 'pending') {
          return res.status(400).send('La solicitud ya ha sido procesada.');
      }

      admin.sentMonitoringRequests[requestIndex].status = 'rejected';
      await admin.save();

      res.status(200).send('Solicitud de monitoreo rechazada correctamente.');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al rechazar la solicitud de monitoreo.');
  }
};
const removeAdmin = async (req, res) => {
  const userId = req.user._id; // Asume autenticación y que tienes el ID del usuario
    const { adminId } = req.body; // El ID del admin a eliminar

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado.');
        }

        // Eliminar la solicitud o la asociación con el admin
        const index = user.monitoringRequests.findIndex(request => request.adminId.equals(adminId));
        if (index !== -1) {
            user.monitoringRequests.splice(index, 1); // Eliminar la solicitud
            await user.save();
        }

        // Opcionalmente, actualizar el Admin para reflejar esta eliminación
        await Admin.findByIdAndUpdate(adminId, { $pull: { monitoredUsers: userId } });

        res.status(200).json({ message: 'Administrador eliminado de las solicitudes de monitoreo' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la asociación con el administrador.');
    }
};

const getDevicesForUser = async (req, res) => {
  const { userId } = req.user; // Asume autenticación y autorización

  try {
      const devices = await Device.find({ monitoredUsers: userId }).populate('adminUser', 'email');
      res.status(200).json(devices);
  } catch (error) {
      res.status(500).send({ message: 'Error al obtener dispositivos para el usuario', error: error.message });
  }
};



module.exports = {
  registerUser,
  loginUser,
  login,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  rejectMonitoringRequest,
  acceptMonitoringRequest,
  removeAdmin,
  getDevicesForUser
};

