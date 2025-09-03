import "reflect-metadata";
import { Container } from "inversify";
import { authModule } from "./modules/auth.module";

const ApplicationContainer = new Container({
	defaultScope: "Singleton",
});

export class DIContainer {
	private static instance: DIContainer;
	private initialized = false;

	private constructor() {}

	static getInstance(): DIContainer {
		if (!DIContainer.instance) {
			DIContainer.instance = new DIContainer();
		}
		return DIContainer.instance;
	}

	initialize(): void {
		if (this.initialized) return;

		ApplicationContainer.load(authModule);
		this.initialized = true;
	}

	destroy(): void {
		ApplicationContainer.unbindAll();
		this.initialized = false;
	}

	get<T>(symbol: symbol & { __type: T }): T {
		if (!this.initialized) {
			this.initialize();
		}

		return ApplicationContainer.get(symbol);
	}

	isInitialized(): boolean {
		return this.initialized;
	}
}

export const getInjection = <T>(symbol: symbol & { __type: T }): T => {
	return DIContainer.getInstance().get(symbol);
};

if (typeof window === "undefined" && process.env.NODE_ENV !== "test") {
	DIContainer.getInstance().initialize();
}
