const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');
const mongoosePaginate = require('mongoose-paginate-v2');

const StockSchema = new mongoose.Schema({
   _id:{
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Id do Schema"
   },

   name:{
      type:mongoose.Schema.Types.String,
      required:true,
      description: "Nome da ação"
   },

   symbol:{
      type:mongoose.Schema.Types.String,
      required:true,
      description:"Ticker da ação"
   }

}, {
   timestamps: true
});

///Index Creation
StockSchema.index({createdAt: 1});
StockSchema.index({createdAt: -1});

//Defining sortable attributes
const sortableAttributes = [
   'createdAt',
   'name',
   'symbol'
];

//Creating the Schema BoilerPlate
StockSchema.statics.getSortableAttributes = () => sortableAttributes;
StockSchema.plugin(mongoosePaginate);
StockSchema.plugin(mongoosePatchUpdate);


module.exports = mongoose.model('StockSchema',StockSchema);
