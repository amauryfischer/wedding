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
import { useSelector } from "react-redux"
import axios from "axios"
import { Product } from "@prisma/client"

const ModalOffer = () => {
	const [from, setFrom] = useState("")
	const [description, setDescription] = useState("")
	const { isOpenOfferModal, offerAmount, offerProductId, products } =
		useSelector((state: RootState) => state.current)
	const offer = async ({
		euros,
		product
	}: { product?: Product; euros: number }) => {
		try {
			const { data } = await axios.post("/api/checkout_sessions", {
				data: { amount: euros, productId: product?.id, from, description }
			})
			const sessionUrl = data

			// Redirect the user to the Stripe Checkout page
			window.open(sessionUrl, "_blank")
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Modal isOpen={isOpenOfferModal}>
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