import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import EmptyStateIllustration from "../../public/illustration/empty-state-illustration.svg";
import Image from "next/image";

export type TableProps<Data extends object> = {
  loading: boolean;
  data: Data[];
  columns: ColumnDef<Data, any>[];
  paginationOptions?: {
    totalCount: number;
    page: number;
    handlePageChange: (page: number) => void;
    label?: string;
  };
  pageLimit?: number;
};

export default function DataTable<Data extends object>({
  loading,
  data,
  columns,
  paginationOptions,
  pageLimit,
}: TableProps<Data>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(pageLimit && {
      initialState: {
        pagination: {
          pageSize: pageLimit,
        },
      },
    }),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  const pageSize = 10;

  return (
    <TableContainer borderRadius="12px" pt={2}>
      <Table variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    isNumeric={meta?.isNumeric}
                    w={
                      header.getSize() === Number.MAX_SAFE_INTEGER
                        ? "auto"
                        : header.getSize()
                    }
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "10px" }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Flex>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={columns.length}>
                <Flex justify="center" align="center" py={4}>
                  <Spinner />
                </Flex>
              </Td>
            </Tr>
          ) : !loading && data.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length}>
                <Flex
                  alignContent={"center"}
                  justifyContent={"center"}
                  flexDir={"column"}
                  justifyItems={"center"}
                  alignItems={"center"}
                  gap={6}
                >
                  <Image
                    src={EmptyStateIllustration}
                    alt="Empty state illustration"
                    width={150}
                    height={150}
                  />
                </Flex>
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                      w={
                        cell.column.getSize() === Number.MAX_SAFE_INTEGER
                          ? "auto"
                          : cell.column.getSize()
                      }
                      fontSize={{ sm: "10px", lg: "12px" }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {paginationOptions && (
          <PaginationFooter
            page={paginationOptions.page}
            totalCount={paginationOptions.totalCount}
            pageSize={pageSize}
            label={paginationOptions.label}
            getPageCount={table.getPageCount}
            handlePageChange={(page: number) =>
              paginationOptions.handlePageChange(page)
            }
          />
        )}
    </TableContainer>
  );
}

export type PaginationFooterProps = {
  page: number;
  label?: string;
  pageSize: number;
  totalCount: number;
  getPageCount: () => number;
  handlePageChange: (page: number) => void;
};

const PaginationFooter = ({
  page,
  label,
  pageSize,
  totalCount,
  getPageCount,
  handlePageChange,
}: PaginationFooterProps) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);
  const [pages, setPages] = useState<string[]>([]);

  const createPages = () => {
    const pages = [];
    const numberOfPages = Math.ceil(totalCount / pageSize);
    const maxNumberOfPages = 10;

    if (numberOfPages <= maxNumberOfPages) {
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i.toString());
      }
      return pages;
    }

    const left = Math.max(1, page - 2);
    const right = Math.min(numberOfPages, page + 2);

    if (page > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      pages.push(i.toString());
    }

    if (page < numberOfPages - 1) pages.push("...");
    if (page < numberOfPages) pages.push(numberOfPages.toString());

    return pages;
  };

  useEffect(() => {
    const numberOfPage = Math.ceil(totalCount / pageSize);
    if (page === numberOfPage) setCanGoNext(false);
    else setCanGoNext(true);

    if (page === 1) setCanGoBack(false);
    else setCanGoBack(true);

    setPages(createPages());
  }, [page, totalCount, pageSize]);

  return (
    <Flex
      direction={{ sm: "column", md: "row" }}
      justify="space-between"
      align="center"
      w="100%"
      px="22px"
      py="16px"
    >
      <Text
        fontSize="sm"
        color="gray.500"
        fontWeight="normal"
        mb={{ sm: "24px", md: "0px" }}
      >
        Mostrando {pageSize * page <= totalCount ? pageSize * page : totalCount} de{" "}
        {totalCount} {label ? label : "entradas"}
      </Text>
      <Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
        <Button
          variant="no-effects"
          onClick={() => handlePageChange(page - 1)}
          transition="all .5s ease"
          w="40px"
          h="40px"
          borderRadius="8px"
          bg="#fff"
          border="1px solid lightgray"
          display={pageSize === 5 ? "none" : canGoBack ? "flex" : "none"}
          _hover={{
            opacity: "0.7",
            borderColor: "gray.500",
          }}
        >
          <Icon as={GrFormPrevious} w="16px" h="16px" color="gray.400" />
        </Button>
        {pageSize === 5 ? (
          <NumberInput
            max={getPageCount() - 1}
            min={1}
            w="75px"
            mx="6px"
            defaultValue="1"
            onChange={(e) => handlePageChange(+e)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper
                onClick={() => handlePageChange(page + 1)}
              />
              <NumberDecrementStepper
                onClick={() => handlePageChange(page - 1)}
              />
            </NumberInputStepper>
          </NumberInput>
        ) : (
          pages.map((pageNumber, index) => {
            return (
              <Button
                variant="no-effects"
                transition="all .5s ease"
                onClick={() => {
                  if (pageNumber === "...") return;
                  handlePageChange(Number(pageNumber));
                }}
                w="40px"
                h="40px"
                borderRadius="8px"
                bg={Number(pageNumber) === page ? "blue.500" : "#fff"}
                border={
                  Number(pageNumber) === page ? "none" : "1px solid lightgray"
                }
                _hover={{
                  opacity: "0.7",
                  borderColor: "gray.500",
                }}
                key={index}
              >
                <Text
                  fontSize="sm"
                  color={Number(pageNumber) === page ? "#fff" : "gray.600"}
                >
                  {pageNumber}
                </Text>
              </Button>
            );
          })
        )}
        <Button
          variant="no-effects"
          onClick={() => handlePageChange(page + 1)}
          transition="all .5s ease"
          w="40px"
          h="40px"
          borderRadius="8px"
          bg="#fff"
          border="1px solid lightgray"
          display={pageSize === 5 ? "none" : canGoNext ? "flex" : "none"}
          _hover={{
            bg: "gray.200",
            opacity: "0.7",
            borderColor: "gray.500",
          }}
        >
          <Icon as={GrFormNext} w="16px" h="16px" color="gray.400" />
        </Button>
      </Stack>
    </Flex>
  );
};