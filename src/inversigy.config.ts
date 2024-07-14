import { Container } from "inversify";
import { AuthService, CategoryService, UserService } from "./services";
import { TYPES } from "./constants";
import { AuthMiddleware } from "./middlewares";
import { ProductService } from "./services/product.service";

const container=new Container();

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<AuthService>(TYPES.AuthService).to(AuthService)
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService)
container.bind<ProductService>(TYPES.ProductService).to(ProductService)
export default container;