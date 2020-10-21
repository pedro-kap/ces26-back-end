const StockModel = require('../models/StockModel');
class StockService{

   toObject(StockModel){
      return StockModel ? StockModel.toObject() : null;
   }

   async create(StockData){
      let stockExists = await StockModel.exists({symbol: StockData.symbol});
      if (stockExists)
         return null;
      const Stock = new StockModel(StockData);
      return this.toObject(await Stock.save())
   }

   async updateById(StockData){
      const stockExists = await StockModel.exists({symbol: StockData.symbol});
      if (!stockExists)
         return null;
      return await StockModel.patchUpdate({symbol: StockData.symbol}, StockData);
   }

   async deleteById({_id}){
      let stockExists = await StockModel.exists({_id});
      if (!stockExists)
         return null;
      return await StockModel.deleteOne({_id});
   }

   async getByName({name}){
      return await StockModel.findOne({name}).lean();
   }

   async updateByName(StockData) {
      let stockExists = await StockModel.exists({symbol: StockData.symbol});
      if (!stockExists)
         return null;
      return await StockModel.patchUpdate({symbol: StockData.symbol}, StockData);
   }

   async getAll(query) {
      return await StockModel.find(query).sort({name:1}).lean();
   }

   async deleteByName({name}) {
      let stockExists = await StockModel.exists({name});
      if (!stockExists)
         return null;
      return await StockModel.deleteOne({name});
   }


}

const stockServiceInstance = new StockService;
module.exports = stockServiceInstance;
