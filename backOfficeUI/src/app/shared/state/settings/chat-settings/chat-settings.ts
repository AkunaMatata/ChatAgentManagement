import { ShortcutsInterface } from './shortcuts/shortcuts-interface';
import { ChatAssignmentInterface } from './chat-assignment/chat-assignment-interface';

export interface ChatSettings {
    shortcuts: ShortcutsInterface[];
    chatAssignment: ChatAssignmentInterface;
};
