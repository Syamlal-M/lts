import { Input } from '@mui/material';
import { PageContainer } from 'components/layout';
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Typography,
} from 'components/shared-ui';
import { useState } from 'react';
import EmplolyeeSummary from './EmployeeSummary';

const DashboardPage = () => {
	const [fileName, setFileName] = useState('');
	const [uploadProgress, setUploadProgress] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [uploadError, setUploadError] = useState(false);

	const UPLOAD_ENDPOINT = '/api/employee/import';

	const handleSubmit = async (e: any) => {
		setUploadProgress(true);
		console.log(e);
		e.preventDefault();
		console.log(e.target.file);
		let formData = new FormData();
		formData.append('file', fileName);
		var requestOptions = {
			method: 'PUT',
			body: formData,
			redirect: 'follow',
		};

		await fetch('/api/employee/import?file')
			.then((response) => response.json())
			.then((result) => {
				if (result.response) {
					setUploadSuccess(true);
				} else {
					setUploadSuccess(false);
				}
				setUploadProgress(false);
			})
			.catch((error) => {
				console.log('error', error);
				setUploadProgress(false);
				setUploadError(true);
			});
	};

	const handleFileChange = (event: any) => {
		console.log(event.target.files[0]);

		event.preventDefault();
		setFileName(event.target.files[0]);
	};

	return (
		<PageContainer title="LTS | Employee Information">
			<Card>
				<CardContent>
					<Typography variant="subtitle1" fontWeight={600}>
						Import Emplolyees
					</Typography>
				</CardContent>
				<CardContent>
					<Grid container direction="column" alignItems="start" spacing={2}>
						<Grid item>
							<Grid container direction="row" alignItems={'center'} spacing={1}>
								<Grid item>
									<Box
										style={{
											backgroundColor: '#EDF0F5',
											padding: '10px',
											borderRadius: '6px',
										}}
									>
										<form onSubmit={handleSubmit}>
											<Grid
												container
												direction="row"
												alignItems="center"
												spacing={1}
											>
												<Grid item>
													<Input
														type="file"
														name="file"
														onChange={handleFileChange}
														// accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
													/>
												</Grid>
												<Grid item>
													<Button
														variant="contained"
														disabled={!fileName}
														className="upload-btn"
														type="submit"
													>
														Upload
													</Button>
												</Grid>
											</Grid>
										</form>
										<Box
											sx={{ display: uploadProgress ? 'flex' : 'none' }}
											style={{ margin: '10px' }}
										>
											<CircularProgress />
										</Box>
									</Box>
								</Grid>
								<Grid item>
									<Button
										fullWidth
										id=""
										variant="outlined"
										onClick={() => {}}
										style={{
											borderColor: '#0C9486cc',
											color: '#47444D',
											borderWidth: '2px solid',
											borderRadius: '6px',
										}}
									>
										Download Template
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Button fullWidth id="" variant="contained" onClick={() => {}}>
								Download Table
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Card style={{ marginBlockStart: '25px' }}>
				<CardContent>
					<Typography variant="subtitle1" fontWeight={600}>
						Emplolyee Summary
					</Typography>
				</CardContent>
				<CardContent>
					<Typography>
						<EmplolyeeSummary />
					</Typography>
				</CardContent>
			</Card>
		</PageContainer>
	);
};

export default DashboardPage;