// Component that allow us to display the children or not based on a condition
import React from "react";

const Show = ({
	when,
	children
}) => {
	return when ? <>{children}</> : <></>
}

export default Show;