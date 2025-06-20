export class Memo<K extends string[], T> {
	private store = new Map<string, T>();

	async memo(resolve: () => Promise<T>, ...keys: K): Promise<T> {
		const key = concat(keys);

		const memoized = this.store.get(key);
		if (memoized) {
			return memoized;
		}

		const data = await resolve();
		this.store.set(key, data);

		return data;
	}

	// MO TODO abandon methods, prefer memo()
	has(...keys: K): boolean {
		return this.store.has(concat(keys));
	}

	get(...keys: K): T | undefined {
		return this.store.get(concat(keys));
	}

	set(value: T, ...keys: K): void {
		this.store.set(concat(keys), value);
	}
}

function concat(keys: string[]): string {
	return keys.join("\0");
}
