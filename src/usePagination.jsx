import React from 'react'

const usePagination = (items, pageLength = 10) => {
    const [currentPage, setCurrentPage] = React.useState(0)

    React.useEffect(() => {
        setCurrentPage(0)
    }, [items])

    const getPageCount = () => {
        return Math.floor((items.length-1)/pageLength) + 1
    }

    const getPaginatedItems = () => {
        return items.slice(
            currentPage*pageLength, currentPage*pageLength + pageLength
        )
    }

    return [getPaginatedItems(), getPageCount(), currentPage, setCurrentPage]
}

export default usePagination