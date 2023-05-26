import {
	Box,
	Button,
	CircularProgress,
	Grid
} from 'components/shared-ui';
import { Input } from '@mui/material';
import { useState } from 'react';

import EmployeeService from 'service/EmployeeInfoService';


const UploadEmployee = () => {
	const [fileName, setFileName] = useState('');
	const [uploadProgress, setUploadProgress] = useState(false);

	const fetchEmployee = () => {
		EmployeeService.fetchEmployee({ 'file': fileName, redirect: 'follow' })
			.then((response) => {
				if (response) {
					// setUploadSuccess(true);
				} else {
					// setUploadSuccess(false);
				}
				setUploadProgress(false);
			})
			.catch((error) => {
				console.log(error);
				setUploadProgress(false);
				// setUploadError(true);
			});
	};

	const handleSubmit = async (e: any) => {
		setUploadProgress(true);
		e.preventDefault();
		fetchEmployee();

	};

	const handleFileChange = (event: any) => {

		event.preventDefault();
		setFileName(event.target.files[0]);
	};

    const handleTemplateDownload = () => {
        EmployeeService.fetchTemplate()
        .then((response: any) => {
            const blob = new Blob([response], { type: 'application/octet-stream' });
          const url = URL.createObjectURL(blob);
  
          const link = document.createElement('a');
          link.href = url;
            link.download = "template.csv";
          link.click();
  
          URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Error downloading file:', error);
        });
      };

	return (
		<Box sx={{ height: 400, maxWidth: 'calc(100vw - 36px)' }}>
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
                                onClick={handleTemplateDownload}
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
            </Grid>
		</Box>
	);
};

export default UploadEmployee;
