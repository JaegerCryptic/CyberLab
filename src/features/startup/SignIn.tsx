import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Icon, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { z } from "zod";

import { StartupLayout } from "./StartupLayout";
import { CLButton } from "../../common/components/buttons/CLButton";
import { ControlledInput } from "../../common/components/input/ControlledInput";
import { ErrorMessage } from "../../common/components/ErrorMessage";
import { REQUIRED_FIELD_MESSAGE } from "../../constants/validation";
import SCPLogo from "../../images/scp_logo.png";

const LoginSchema = z
	.object({
		userName: z.string({ required_error: REQUIRED_FIELD_MESSAGE }),
	})
	.strict();

type LoginSchema = z.infer<typeof LoginSchema>;

type ButtonBehaviour = "HYPERLINK" | "BUTTON";
interface Props {
	buttonBehaviour: ButtonBehaviour;
	buttonUpdate?: () => void;
}

export const SignIn = ({}: Props) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.clear();
	}, [queryClient]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		mode: "onSubmit",
	});

	const handleOnSubmit: SubmitHandler<LoginSchema> = (data) => {};

	return (
		<StartupLayout title="Welcome to the SCP Field Agent Certification course.">
			<Grid
				container
				direction="column"
				spacing={2}
				display="flex"
				alignItems="left"
				component="form"
				onSubmit={handleSubmit(handleOnSubmit)}
			>
				<Grid xs={8} display={"flex"} justifyContent={"left"} mt={2}>
					<Typography>Please enter your name to get started:</Typography>
				</Grid>
				<Grid xs={8} display={"flex"} justifyContent={"left"}>
					<ControlledInput<LoginSchema>
						control={control}
						defaultValue=""
						name="userName"
						inputProps={{
							label: "name",
							autoFocus: true,
							autoComplete: "firstName",
						}}
					/>
					{errors.userName && (
						<ErrorMessage message={errors.userName.message ?? ""} />
					)}
				</Grid>

				<Grid xs={8} display={"flex"} justifyContent={"center"}>
					<CLButton fullWidth type="submit">
						Sign in
					</CLButton>
				</Grid>
				<Grid xs={12} display={"flex"} justifyContent={"center"} mt={10}>
					<Icon sx={{ width: "100%", height: "auto" }}>
						<img
							src={SCPLogo}
							alt="Logo"
							style={{ width: "100%", height: "auto", marginLeft: -200 }}
						/>
					</Icon>
				</Grid>
			</Grid>
			<Grid xs={6} sx={{ height: "100%" }}>
				<Icon sx={{ width: "100%", height: "auto" }}>
					<img
						src={SCPLogo}
						alt="Logo"
						style={{ width: "100%", height: "auto", marginLeft: -200 }}
					/>
				</Icon>{" "}
			</Grid>

			{/* extra <div> is required to prevent forwardRef error */}
			<div></div>
		</StartupLayout>
	);
};
