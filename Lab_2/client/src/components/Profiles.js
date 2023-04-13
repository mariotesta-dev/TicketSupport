import { useState } from "react";
import { profilesAPI } from "../API";
import { Link } from "react-router-dom";

export default function Profiles() {
	const [email, setEmail] = useState("");
	const [profile, setProfile] = useState();
	const [error, setError] = useState(false);
	const [edit, setEdit] = useState(false);

	const handleGetProfile = async (e) => {
		e.preventDefault();

		if (email.length === 0) {
			setError({
				status: 400,
				title: "Please enter an email address",
				detail:
					"You can create a new profile or insert a valid email address to edit an existing one.",
			});
			return;
		}

		try {
			const response = await profilesAPI.getProfile(email);
			setError(false);
			setProfile(response);
		} catch (err) {
			setProfile();
			setError(err);
		}
	};

	const clearProfile = () => {
		setEdit(false);
		setProfile();
		setError(false);
	};

	return (
		<div className="profiles-container">
			<div className="btn-container">
				<h1>Profiles API</h1>

				<form className="input-container" onSubmit={handleGetProfile}>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="test@mail.com"
						className="textbox"
					/>
					<button className="btn" type="submit">
						Search
					</button>
				</form>

				<div className="btn-container-row">
					<Link to={"/createprofile"}>
						<button className="btn">Create a profile</button>
					</Link>
				</div>
			</div>
			<div className="list-container">
				<button className="clear-btn" onClick={() => clearProfile()}>
					Clear
				</button>
				{error && <Error error={error} />}

				{profile &&
					(edit ? (
						<ProfileEdit
							profile={profile}
							setEdit={setEdit}
							setProfile={setProfile}
							setError={setError}
						/>
					) : (
						<Profile profile={profile} setEdit={setEdit} />
					))}
			</div>
		</div>
	);
}

function Profile({ profile, setEdit }) {
	return (
		<div className="profile-container">
			<div>
				<h2>{profile.email}</h2>
				<p>
					Name: <b>{profile.name}</b>
				</p>
				<p>
					Surname: <b>{profile.surname}</b>
				</p>
			</div>

			<button className="btn" onClick={() => setEdit(true)}>
				Edit
			</button>
		</div>
	);
}

function ProfileEdit({ profile, setEdit, setProfile, setError }) {
	const currentEmail = profile.email;
	const [email, setEmail] = useState(profile.email);
	const [name, setName] = useState(profile.name);
	const [surname, setSurname] = useState(profile.surname);

	const handleSave = async () => {
		setEdit(false);
		const modifiedProfile = { email: email, name: name, surname: surname };

		try {
			await profilesAPI.updateProfile(currentEmail, modifiedProfile);
			setProfile(modifiedProfile);
			setError(false);
		} catch (err) {
			setError(err);
		}
	};

	return (
		<form className="profile-container-edit" onSubmit={handleSave}>
			<div>
				<p>
					<label className="label">Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="textbox-sm"
						required
					/>
				</p>
				<p>
					<label className="label">Name:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						className="textbox-sm"
						required
					/>
				</p>
				<p>
					<label className="label">Surname:</label>
					<input
						type="text"
						value={surname}
						onChange={(e) => setSurname(e.target.value)}
						placeholder="Surname"
						className="textbox-sm"
						required
					/>
				</p>
			</div>

			<button className="btn" type="submit">
				Save
			</button>
		</form>
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
