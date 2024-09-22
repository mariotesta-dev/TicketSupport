export class History {
	constructor(messages, statusList) {
		this.messages = messages;
		this.statusList = statusList;
	}

	getHistory() {
		const mappedMessages = this.messages.map(
			(message) => new HistoryObject("message", message, message.sentAt)
		);
		const mappedStatusList = this.statusList.map(
			(status) => new HistoryObject("status", status, status.updatedAt)
		);
		return mappedMessages.concat(mappedStatusList).sort((a, b) => {
			const date1 = new Date(a.timestamp);
			const date2 = new Date(b.timestamp);
			return date1 - date2;
		});
	}
}

export class HistoryObject {
	constructor(type, object, timestamp) {
		this.type = type;
		this.object = object;
		this.timestamp = timestamp;
	}
}

/**
 * API/history/{ticketId}
[
    {
        "status": "OPEN",
        "updatedAt": "2023-07-23T19:16:01.474892"
    },
    {
        "status": "IN_PROGRESS",
        "updatedAt": "2023-07-23T19:16:38.354653"
    },
    {
        "status": "IN_PROGRESS",
        "updatedAt": "2023-07-25T12:16:50.351783"
    }
]

API/tickets/{ticketId}/messages --> only accessible by experts and customers (TODO CHANGE)
[
    {
        "id": 1,
        "customer": "John Doe",
        "expert": "Alice Johnson",
        "sentBy": "expert",
        "text": "Hi, thank you for contacting customer support!",
        "sentAt": "2023-07-23T19:17:38.627815"
    },
    {
        "id": 2,
        "customer": "John Doe",
        "expert": "Alice Johnson",
        "sentBy": "customer",
        "text": "I don't know how to open this product",
        "sentAt": "2023-07-23T19:17:56.038865"
    },
    {
        "id": 3,
        "customer": "John Doe",
        "expert": "Alice Johnson",
        "sentBy": "expert",
        "text": "Hi, thank you for contacting customer support!",
        "sentAt": "2023-07-23T19:18:01.954604"
    }
]
*/
