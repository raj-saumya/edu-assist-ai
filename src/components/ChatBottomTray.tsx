import { useState } from 'react'
import { useChatStore } from '~/store/chatStore'
import ChatActionsMenu from './ChatActionsMenu'

const ChatBottomTray = () => {
  const [inputValue, setInputValue] = useState('')
  const sendStreamingMessage = useChatStore((state) => state.sendStreamingMessage)

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendStreamingMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-full flex-1">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Ask anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full py-3 px-4 border-none bg-transparent outline-none text-white placeholder:text-gray-500"
            />
          </div>
          <button className="flex items-center justify-center p-2 h-12 w-12">
            <img src="/images/icon-mic.svg" alt="mic" className="w-6 h-6 brightness-0 invert" />
          </button>
        </div>
        <button
          onClick={handleSendMessage}
          className="flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 p-2 h-12 w-12 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all"
        >
          <img src="/images/icon-send.svg" alt="send" className="w-6 h-6" />
        </button>
        <ChatActionsMenu />
      </div>
      <span className="text-xs text-center text-gray-500">
        AI responses are based on your NCERT textbooks
      </span>
      <span className="text-xs text-center text-gray-500">
        Speak or type your questions
      </span>
    </div>
  );
};

export default ChatBottomTray;
