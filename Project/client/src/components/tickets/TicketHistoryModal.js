import { InfoOutlineIcon, TimeIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    HStack,
    Flex
  } from '@chakra-ui/react'
import TicketsTable from './TicketsTable';
import * as session from "../../utils/SessionUtils";
import { ticketsAPI } from '../../api/API';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Status from '../Status';
import * as converters from '../../utils/converters';

function TicketHistoryModal({ticket}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ticketHistory , setTicketHistory] = useState([]);
    const role = session.getUserRole();

    useEffect(() => {
        const getTicketHistory = async () => {
            try {
                const res = await ticketsAPI.getTicketHistory(ticket.id);
                setTicketHistory(res.map((ticketStatus) => {
                    return {
                        status: ticketStatus.status,
                        updatedAt: ticketStatus.updatedAt,
                    }
                }));
            }
            catch (error) {
                toast.error(error.detail);
            }
        };
        getTicketHistory();
    }, [ticket]);

    return (
        <>
            <Button onClick={onOpen} size={"sm"} colorScheme={"gray"}>
                <InfoOutlineIcon/>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Ticket #{ticket.id} history</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDirection={"column"} gap={3}>
                        {ticketHistory.map((ticketStatus) => {
                            return (
                                <HStack>
                                    <Status status={ticketStatus.status}></Status>
                                    <Text> - {converters.formatDateTime(ticketStatus.updatedAt)}</Text><TimeIcon/>
                                </HStack>
                            )
                        })}
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
  )
};

export default TicketHistoryModal;