"use client"
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	Spacer
} from "@nextui-org/react"
import { Product } from "@prisma/client"
import { useRouter } from "next/navigation"

const ModalThanks = ({
	from,
	amount,
	product,
	description
}: { from: string; amount: string; product: Product; description: string }) => {
	const router = useRouter()
	return (
		<Modal isOpen={true} onOpenChange={() => {}}>
			<ModalContent>
				<ModalBody>
					<div>
						<div className="font-bold text-4xl">🥳</div>
						<h1 className="text-2xl font-bold">
							Merci pour votre contribution {from}!
						</h1>
						<Spacer y={4} />
						<p>Vous avez offert {amount}€</p>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						onClick={() => {
							router.push("/gift")
						}}
					>
						Revenir à la liste des cadeaux
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ModalThanks
