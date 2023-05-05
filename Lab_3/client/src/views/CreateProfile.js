import { profilesAPI } from "../API";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateProfile() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleCreateProfile = async (e) => {
		e.preventDefault();

		try {
			const newProfile = { email: email, name: name, surname: surname };
			await profilesAPI.createProfile(newProfile);
			setSuccess(true);
		} catch (err) {
			setError(err);
			setSuccess(false);
		}
	};

	return (
		<div className="main-container-full">
			<h1>Create Profile</h1>

			{error && <Error error={error} />}

			<form className="input-container-col" onSubmit={handleCreateProfile}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="textbox"
					required
				/>

				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
					className="textbox"
					required
				/>

				<input
					type="text"
					value={surname}
					onChange={(e) => setSurname(e.target.value)}
					placeholder="Surname"
					className="textbox"
					required
				/>
				<button className="btn" type="submit">
					Create
				</button>
			</form>

			{success && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<h2>Profile added successfully!</h2>
					<Link to={"/"}>
						<button className="btn">Go Back</button>
					</Link>
				</div>
			)}
		</div>
	);
}

function Error({ error }) {
	const { detail, title } = error;

	return (
		<div className="error-container" style={{ marginBottom: "10px" }}>
			<h2>{title}</h2>
			<p>{detail}</p>
		</div>
	);
}
