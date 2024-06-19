// export const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>

export const getKeys = Object.keys as <T extends object>(
	obj: T
) => Array<keyof T>
