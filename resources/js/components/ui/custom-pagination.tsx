import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Meta } from '@/types'

interface CustomPaginationProps{
    meta: Meta
}

const CustomPagination = ({meta}:CustomPaginationProps) => {

  return (
    <div>
        <Pagination className='mt-4'>
            <PaginationContent>
                <PaginationItem className='flex justify-center gap-x-1'>
                    {meta.links
                    .filter((item)=>!item.label.toLowerCase().includes('pagination'))
                    .map((item, index)=>(
                        <PaginationLink key={index} size={"sm"} href={item.url} isActive={item.active} className={`${item.active ? 'bg-primary text-white hover:bg-primary/80' : ''} rounded-md`}>
                            {item.label.replace(/&laquo;|&raquo/g,'')}
                        </PaginationLink>
                    ))
                    }
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
  )
}

export default CustomPagination