export const getCoursesListEach = (
	index: number,
	length: number,
	name: string
) => (index + 1 === length ? name : name + ', ')

interface IArrayItem {
	name: string
}

export const getCoursesList = (array: IArrayItem[]) =>
	array.map((i) => i.name).join(', ')
