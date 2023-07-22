import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

  import React from "react";

  function TicketsTable(props) {
      return (
        <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Ticket Id</Th>
              <Th>Product EAN</Th>
              <Th>Category</Th>
              <Th>Summary</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>ean</Td>
              <Td>category</Td>
              <Td>summary</Td>
              <Td>description</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>ean</Td>
              <Td>category</Td>
              <Td>summary</Td>
              <Td>description</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>ean</Td>
              <Td>category</Td>
              <Td>summary</Td>
              <Td>description</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      );
  }
  
  export default TicketsTable;
  