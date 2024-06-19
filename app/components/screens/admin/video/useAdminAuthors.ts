import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { AuthorService } from '@/services/author/author.service'

import { toastError } from '@/utils/toastr-error'

export const useAdminAuthors = () => {
	const queryData = useQuery('list of author', () => AuthorService.getAll(), {
		select: ({ data }) =>
			data.map(
				(author): IOption => ({
					label: author.name,
					value: author._id,
				})
			),
		onError(error) {
			toastError(error, 'author list')
		},
	})

	return queryData
}
