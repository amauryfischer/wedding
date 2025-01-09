"use client"

import styled from "styled-components"

export const ChildrenContainerStyle = styled.div`
	height: calc(100vh - var(--navbar-height));
	width: 100%;
`

export const ChildrenContainer = (props: any) => {

	return (
		<ChildrenContainerStyle {...props}>{props.children}</ChildrenContainerStyle>
	)
}
