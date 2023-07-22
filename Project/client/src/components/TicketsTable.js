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
import { useOutletContext } from 'react-router-dom';

  function TicketsTable(props) {

    const [user, setUser] = useOutletContext();

      return (
        <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Product EAN</Th>
              <Th>Category</Th>
              <Th>Summary</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user.tickets.map((ticket, key) => 
                (<Tr key={key}>
                    <Td>{key+1}</Td>
                    <Td>{ticket.product.ean}</Td>
                    <Td>{ticket.category}</Td>
                    <Td>{ticket.summary}</Td>
                    <Td>{ticket.description}</Td>
                </Tr>
                )
            )
            }
          </Tbody>
        </Table>
      </TableContainer>
      );
  }
  
  export default TicketsTable;
  