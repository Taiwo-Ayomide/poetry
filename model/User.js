const moongoose = require("mongoose");

const UserSchema = new moongoose.Schema(
    {
        name: { type: String, unique: true },
        email: { type: String, unique: true },
        username: { type: String, unique: true },
        password: { type: String },
        isPoet: {
            type: Boolean,
            unique: true
        },
    }, { timestamps: true }
)

module.exports = moongoose.model("User", UserSchema);