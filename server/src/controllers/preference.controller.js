// const editPreference = async (req, res) => {
//   try {
//     var findProfiles = await profileModel.findOne({auth: req.body.auth._doc._id});
//     if (findProfiles) {
//       var updateProfile = await profileModel.findByIdAndUpdate(
//         findProfiles._id,
//         req.body
//       );

//       updateProfile
//         ? res.status(200).json({ message: "Profile updated successfully" })
//         : res
//             .status(501)
//             .json({ message: "An error occured while updating profile " });
//     } else {
//       res.status(404).json({ message: "Profile not Found", data: req.body });
//     }
//   } catch (error) {
//     res.status(501).json({ error: error.message });
//   }
//   res.end();
// };

// module.exports = {
//   editPreference
// };
