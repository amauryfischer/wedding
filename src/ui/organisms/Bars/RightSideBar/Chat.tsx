import { Avatar, Input, Tab } from "@nextui-org/react"

import useChannel from "@/hooks/data/entity/use-channel.hook"
import useChatMessage from "@/hooks/data/entity/use-chat-message.hook"
import moment from "moment"
import Flex from "@/ui/atoms/Flex"
import { Tabs } from "@nextui-org/react"
import { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import SendFleetButton from "@/ui/atoms/buttons/SendFleetButton"
import useChatMessageActions from "@/hooks/data/actions/use-chat-message-actions.hook"
import useCurrentUser from "@/hooks/current/use-current-user.hook"
import { useRef } from "react"

const Messages = styled.div<{ $isMe: boolean }>`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem;
	background-color: var(--grey800);
	border-radius: 0.5rem;
	margin-bottom: 0.5rem;
	width: 100%;
	${(props) =>
		props.$isMe &&
		css`
			text-align: right;
			flex-direction: row-reverse;
		`}
`
const MessagesContainer = styled.div`
	flex-direction: column;
	max-height: 79vh;
	overflow-y: auto;
	scrollbar-width: thin;
	scrollbar-color: var(--grey400) var(--grey800);
	margin-bottom: 1rem;
`
const ChatContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0.5rem;
	padding-bottom: 2rem;
`
const Chat = () => {
	const channel = useChannel()
	const messages = useChatMessage()
	const { createChatMessage, fetchChatMessage } = useChatMessageActions()
	const [currentChannelId, setCurrentChannelId] = useState<string | undefined>(
		undefined
	)
	// every 30 seconds, fetch the messages
	useEffect(() => {
		const interval = setInterval(() => {
			fetchChatMessage()
		}, 30_000)
		return () => clearInterval(interval)
	}, [])
	const user = useCurrentUser()
	const [currentMessage, setCurrentMessage] = useState<string>("")
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages])

	const submitMessage = () => {
		const message = {
			content: currentMessage,
			channelId: currentChannelId ?? Object.values(channel)[0].id,
			userId: user.id
		}
		createChatMessage(message)
		setCurrentMessage("")
	}
	return (
		<div className="w-full mt-2 flex flex-col">
			<Tabs variant="bordered">
				{Object.values(channel).map((channel) => {
					return (
						<Tab key={channel.id} title={channel.name} className="w-full">
							<ChatContainer key={channel.id}>
								<Flex
									direction="column"
									alignItems="end"
									fullHeight
									justifyContent="space-between"
								>
									<MessagesContainer>
										{Object.values(messages).map((message) => (
											<Messages
												key={message.id}
												$isMe={message.userId === user.id}
											>
												<Avatar
													size="sm"
													src="https://github.com/nextui-org.png"
													className="min-w-8"
												/>
												<div>
													<div
														className={`${
															message.pseudo === "Angegreen"
																? "text-primary"
																: ""
														}`}
													>
														{message.content}
													</div>
													<div className="text-xs text-gray-400">
														{message.pseudo} -{" "}
														{moment(message.createdAt).format(
															"DD/MM/YYYY HH:mm"
														)}{" "}
													</div>
												</div>
											</Messages>
										))}
										<div ref={messagesEndRef} />
									</MessagesContainer>
									<Input
										className="mb-4 w-full"
										placeholder="Message"
										variant="bordered"
										fullWidth
										value={currentMessage}
										onChange={(e) => setCurrentMessage(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												submitMessage()
											}
										}}
										endContent={
											<SendFleetButton
												onClick={submitMessage}
												size="sm"
												variant="light"
												isIconOnly
											/>
										}
									/>
								</Flex>
							</ChatContainer>
						</Tab>
					)
				})}
			</Tabs>
		</div>
	)
}

export default Chat
