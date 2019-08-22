const { Asset } = require('../models');

async function getAllAssets() {
  return Asset.findAll();
}

async function getAssetById(id) {
  return Asset.findByPk(id);
}

async function createAsset(properties) {
  return Asset.create(properties);
}

async function upsertAsset(id, properties) {
  const asset = await Asset.findByPk(id);

  if (!asset) {
    return createAsset(properties);
  }

  for (const [key, value] of Object.entries(properties)) {
    asset[key] = value;
  }

  await asset.save();

  return asset;
}

async function removeAsset(asset) {
  return asset.destroy();
}

module.exports = {
  getAssetById,
  getAllAssets,
  createAsset,
  upsertAsset,
  removeAsset
};
