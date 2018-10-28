const ChangePasswordForm = () => (
	<form action="http://localhost:8081/change-password" method="POST">
		<h1>Change Your Password</h1>
		<div>
			<label htmlFor="currentPassword">Current Password:</label>
			<input type="password" name="currentPassword" id="currentPassword" />
		</div>
		<div>
			<label htmlFor="newPassword">New Password:</label>
			<input type="password" name="newPassword" id="newPassword" />
		</div>
		<div>
			<label htmlFor="confirmNewPassword">Confirm New Password:</label>
			<input type="password" name="confirmNewPassword" id="confirmNewPassword" />
		</div>
		<button type="submit">submit</button>
	</form>
);

ReactDOM.render(<ChangePasswordForm />, document.body);
