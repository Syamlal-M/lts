import Layout from '../layout';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Input, Button } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// import axios from 'axios';
import EmplolyeeSummary from './employeeSummary';

export default function Home() {
	const [fileName, setFileName] = React.useState(null);
	const [uploadProgress, setUploadProgress] = React.useState(false);
	const [uploadSuccess, setUploadSuccess] = React.useState(false);
	const [uploadError, setUploadError] = React.useState(false);

	const UPLOAD_ENDPOINT = '/api/employee/import';

	const handleSubmit = async (e) => {
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

		await fetch('/api/employee/import?file', requestOptions)
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

	const handleFileChange = (event) => {
		console.log(event.target.files[0]);

		event.preventDefault();
		setFileName(event.target.files[0]);
	};

	return (
		<Layout>
			<Container>
				<Accordion expanded={true} style={{ marginBlockStart: '5%' }}>
					<AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
						<Typography>
							<h4>Import Emplolyees</h4>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div className="mb-3" style={{ marginBottom: '50px' }}>
							<form onSubmit={handleSubmit}>
								<Input
									type="file"
									name="file"
									onChange={handleFileChange}
									accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
								/>
								<Button
									variant="contained"
									disabled={!fileName}
									className="upload-btn"
									type="submit"
									style={{ marginLeft: '30px' }}
								>
									Upload
								</Button>
							</form>
							<Box
								sx={{ display: uploadProgress ? 'flex' : 'none' }}
								style={{ marginTop: '30px' }}
							>
								<CircularProgress />
							</Box>

							{uploadSuccess && (
								<Alert severity="success" style={{ marginTop: '25px' }}>
									The employees imported successfully
								</Alert>
							)}

							{uploadError && (
								<Alert severity="error" style={{ marginTop: '25px' }}>
									Failed to import the employee list
								</Alert>
							)}
						</div>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={true}>
					<AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
						<Typography>
							<h4>Emplolyee Summary</h4>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							<EmplolyeeSummary />
						</Typography>
					</AccordionDetails>
				</Accordion>
			</Container>
		</Layout>
	);
}
