export const Status = {
    Pending: 'pending',
    Delivered: 'delivered',
    Cancelled: 'cancelled'
} as const;

export const quantity_unit = {
    KG: 'kg'
} as const;

export const ProductCategory = {
    GrainsAndCereals: 'Grains & Cereals',
    TubersAndRootCrops: 'Tubers & Root Crops',
    LegumesAndBeans: 'Legumes & Beans',
    Vegetables: 'Vegetables',
    Fruits: 'Fruits',
    SpicesAndHerbs: 'Spices & Herbs',
    NutsAndSeeds: 'Nuts & Seeds',
    LivestockAndPoultry: 'Livestock & Poultry',
    FishAndSeafood: 'Fish & Seafood',
    DairyProducts: 'Dairy Products',
    ProcessedFoods: 'Processed Foods',
    OrganicProducts: 'Organic Products',
    FertilizersAndInputs: 'Fertilizers & Inputs',
    AgriculturalEquipment: 'Agricultural Equipment'
} as const;