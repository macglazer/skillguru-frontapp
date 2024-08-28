import {
  ChatLoadContactsInput,
  ChatLoadMessagesInput,
  ChatSwitchContactInput,
  ChatSendMessageInput,
  ChatMessagesOutput,
  ChatContactsOutput,
} from "./chat.service.types";

type Callback = (data: any) => void;

interface Callbacks {
  [key: string]: Callback;
}

class WebSocketService {
  private static instance: WebSocketService | null = null;
  private socketRef: WebSocket | null = null;
  private callbacks: Callbacks = {};
  // private loadMessagesCallback: Callback = () => {};
  // private loadContactsCallback: Callback = () => {};
  private onOpenCallback: () => void = () => {};

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(): void {
    const path = `ws://localhost:3020`;
    this.socketRef = new WebSocket(path);

    this.socketRef.onopen = () => {
      this.onOpenCallback();
    };

    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.log(String(e));
    };

    this.socketRef.onclose = () => {
      console.log("WebSocket closed. Reconnect will be attempted in 1 second.");
      setTimeout(() => {
        this.connect();
      }, 1000);
    };
  }

  private socketNewMessage(data: any): void {
    const parsedData = JSON.parse(data);
    const { type, payload } = parsedData;

    if (type === "connection" && 'connection' in this.callbacks) {
      this.callbacks['connection'](payload)
      return
    }

    if (type === "messages" && 'messages' in this.callbacks) {
      this.callbacks['messages'](payload as ChatMessagesOutput)
      return
    }

    if (type === "contacts" && 'contacts' in this.callbacks) {
      this.callbacks['contacts'](payload as ChatContactsOutput)
      return
    }

     if (Object.keys(this.callbacks).length > 0 && this.callbacks[type]) {
      this.callbacks[type](payload);
    }
  }

  public loadContacts(input?: ChatLoadContactsInput["payload"]): void {
    const phrase = input?.phrase ?? undefined;
    const take = input?.take ?? 10;
    const skip = input?.skip ?? undefined;
    if (this.socketRef && this.socketRef.readyState === WebSocket.OPEN) {
      this.socketRef.send(
        JSON.stringify({
          type: "load-contacts",
          payload: {
            phrase,
            take,
            skip,
          },
        } as ChatLoadContactsInput)
      );
    }
  }

  public loadMessages(input: ChatLoadMessagesInput["payload"]): void {
    const { contactId, take, beforeMessageId } = input;
    if (this.socketRef && this.socketRef.readyState === WebSocket.OPEN) {
      this.socketRef.send(
        JSON.stringify({
          type: "load-messages",
          payload: {
            contactId,
            take,
            beforeMessageId,
          },
        } as ChatLoadMessagesInput)
      );
    }
  }

  public sendMessage(input: ChatSendMessageInput["payload"]): void {
    const { recipient, text } = input;
    if (this.socketRef && this.socketRef.readyState === WebSocket.OPEN) {
      this.socketRef.send(
        JSON.stringify({
          type: "send-message",
          payload: {
            recipient,
            text,
          },
        } as ChatSendMessageInput)
      );
    }
  }

  public switchContact(input: ChatSwitchContactInput["payload"]): void {
    const { contactId } = input;
    if (this.socketRef && this.socketRef.readyState === WebSocket.OPEN) {
      this.socketRef.send(
        JSON.stringify({
          type: "switch-contact",
          payload: {
            contactId,
          },
        } as ChatSwitchContactInput)
      );
    }
  }

  public setLoadMessagesCallback(callback: Callback) {
    this.addCallbacks('messages', callback)
  }

  public setLoadContactsCallback(callback: Callback) {
    this.addCallbacks('contacts', callback)
  }

  public setOnOpenCallback(callback: () => void) {
    this.addCallbacks('connection', callback)
  }

  public addCallbacks(type: string, callback: (data: any) => void): void {
    this.callbacks[type] = callback;
  }

  public closeSocket(): void {
    if (this.socketRef) {
      this.socketRef.close();
    }
  }

  public waitForSocketConnection(callback: () => void): void {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection.bind(this);
    setTimeout(() => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        callback();
      } else {
        recursion(callback);
      }
    }, 1);
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
