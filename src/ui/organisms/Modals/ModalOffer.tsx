"use client"
import { RootState } from "@/redux/store"
import { People } from "@mui/icons-material"
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Textarea
} from "@nextui-org/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { Product } from "@prisma/client"
import { setIsOpenOfferModal } from "@/redux/slice/current.slice"

const ModalOffer = () => {
	const [from, setFrom] = useState("")
	const [description, setDescription] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const { isOpenOfferModal, offerAmount, offerProductId, products } =
		useSelector((state: RootState) => state.current)
	const dispatch = useDispatch()
	const offer = async ({ euros }: { euros: number }) => {
		try {
			setIsLoading(true)
			const { data } = await axios.post("/api/checkout_sessions", {
				data: {
					amount: euros,
					productId: offerProductId,
					from,
					description,
					imageUrl: products?.find((p) => p.id === offerProductId)?.imageUrl
				}
			})
			const sessionUrl = data

			// Redirect the user to the Stripe Checkout page
			window.open(sessionUrl, "_blank")
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<Modal
			isOpen={isOpenOfferModal}
			onOpenChange={() =>
				dispatch(
					setIsOpenOfferModal({
						isOpenOfferModal: false,
						offerAmount: 0,
						offerProductId: undefined
					})
				)
			}
		>
			<ModalContent>
				<ModalHeader>
					Offrir{" "}
					{offerProductId
						? products?.find((p) => p.id === offerProductId)?.imageUrl
						: "contribution libre"}
				</ModalHeader>
				<ModalBody>
					<div className="flex flex-col gap-2">
						<div>Offrir : {offerAmount}€</div>

						<Input
							value={from}
							startContent={<People />}
							placeholder="De la part de"
							onChange={(e) => setFrom(e.target.value)}
						/>
						<Textarea
							placeholder="message complémentaire"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Button
							color="primary"
							onPress={() => offer({ euros: offerAmount })}
							isLoading={isLoading}
						>
							Offrir
						</Button>
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default ModalOffer