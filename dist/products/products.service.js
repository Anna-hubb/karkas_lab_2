"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const category_entity_1 = require("../categories/category.entity");
let ProductsService = class ProductsService {
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async create(createProductDto) {
        const category = await this.categoriesRepository.findOne({ where: { id: createProductDto.category_id } });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${createProductDto.category_id} not found`);
        }
        const product = this.productsRepository.create({
            ...createProductDto,
            category,
        });
        return this.productsRepository.save(product);
    }
    async findAll(page, limit) {
        const options = { relations: ['category'], order: { created_at: 'DESC' } };
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        const [items, totalItems] = await this.productsRepository.findAndCount(options);
        const meta = {
            totalItems,
            itemCount: items.length,
            itemsPerPage: limit || totalItems,
            totalPages: limit ? Math.ceil(totalItems / limit) : 1,
            currentPage: page || 1,
        };
        return { items, meta };
    }
    async findOne(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        if (updateProductDto.category_id) {
            const category = await this.categoriesRepository.findOne({ where: { id: updateProductDto.category_id } });
            if (!category) {
                throw new common_1.NotFoundException(`Category with ID ${updateProductDto.category_id} not found`);
            }
            product.category = category;
        }
        Object.assign(product, updateProductDto);
        return this.productsRepository.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productsRepository.remove(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map