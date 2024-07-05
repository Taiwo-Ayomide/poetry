const moongoose = require("mongoose");

const PoemSchema = new moongoose.Schema(
    {
        title: { type: String },
        poet: { type: String },
        poem: { type: String }
    }
)

module.exports  = moongoose.model("Poem", PoemSchema);