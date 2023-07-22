import React from "react";
import { useOutletContext } from "react-router-dom";

export default function DashHero() {
	const [user, setUser] = useOutletContext();
	return (
		<p>
			Welcome, <b>{user.name}</b>.
		</p>
	);
}
