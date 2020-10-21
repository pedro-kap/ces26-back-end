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

   async getBySymbol({symbol}){
      return await StockModel.findOne({symbol}).lean();
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

   async deleteBySymbol({symbol}) {
      let stockExists = await StockModel.exists({symbol});
      if (!stockExists)
         return null;
      return await StockModel.deleteOne({symbol});
   }
}

const stockServiceInstance = new StockService;
module.exports = stockServiceInstance;
