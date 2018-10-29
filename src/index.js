class ChangePasswordForm extends React.Component {
	state = {
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
		currentPasswordCheckResult: null
	};
	onSubmit = e => {
		e.preventDefault();
		fetch("http://localhost:8081/change-password", {
			method: "POST",
			body: new URLSearchParams([...new FormData(e.target).entries()])
		}).then(response => {
			const { ok } = response;
			response.text().then(text => {
				this.setState({
					currentPasswordCheckResult: {
						ok,
						text
					}
				});
			});
		});
	};
	onChangeInput = e => {
		const { target } = e;
		const { id, value } = target;
		this.setState({ [id]: value, currentPasswordCheckResult: null });
	};
	render() {
		const {
			currentPassword,
			newPassword,
			confirmNewPassword,
			currentPasswordCheckResult
		} = this.state;
		const successes = [];
		const errors = [];
		if (newPassword) {
			const minLength = 8;
			if (newPassword.length < minLength) {
				errors.push(
					`Your password must contain at least ${minLength} characters`
				);
			}
			if (!newPassword.match(/[a-z]/) || !newPassword.match(/[A-Z]/)) {
				errors.push("The password must contain both cases");
			}
			if (!newPassword.match(/\d/)) {
				errors.push("The password must contain digits");
			}
			if (confirmNewPassword !== newPassword) {
				errors.push(`Passwords don't match`);
			}
		}
		if (currentPasswordCheckResult) {
			(currentPasswordCheckResult.ok ? successes : errors).push(
				currentPasswordCheckResult.text
			);
		}
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Change Your Password</h1>
				<div>
					<label htmlFor="currentPassword">Current Password:</label>
					<input
						onChange={this.onChangeInput}
						value={currentPassword}
						type="password"
						name="currentPassword"
						id="currentPassword"
					/>
				</div>
				<div>
					<label htmlFor="newPassword">New Password:</label>
					<input
						onChange={this.onChangeInput}
						value={newPassword}
						type="password"
						name="newPassword"
						id="newPassword"
					/>
				</div>
				<div>
					<label htmlFor="confirmNewPassword">
						Confirm New Password:
					</label>
					<input
						onChange={this.onChangeInput}
						value={confirmNewPassword}
						type="password"
						name="confirmNewPassword"
						id="confirmNewPassword"
					/>
				</div>
				{successes.map(success => (
					<p className="success" key={success}>
						{success}
					</p>
				))}
				{errors.map(error => <p key={error}>{error}</p>)}
				<button
					type="submit"
					disabled={
						!currentPassword || !newPassword || errors.length > 0
					}
				>
					submit
				</button>
			</form>
		);
	}
}

ReactDOM.render(<ChangePasswordForm />, document.body);
