
class envConfig {
  config: any;
}

export const PORT = () => parseInt(instance.config?.SERVER_PORT || "5000", 10);
export const ENV = () => instance.config?.APP_ENV || "development";
export const LOGGER_NAME = () => instance.config?.LOGGER_NAME || "CMSNode";
export const LOGGER_LEVEL = () => instance.config?.LOGGER_LEVEL || "info";
export const WORDPRESS_HOST = () => instance.config?.WORDPRESS_HOST || "wordpress.homes.com:5050";

const instance = new envConfig();
export default instance;
