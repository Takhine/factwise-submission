import React, { useEffect, useState } from "react";
import Typography from "../../atoms/Typography";
import { Genders, IUserStoreData } from "src/shared/types/user";
import Avatar from "src/components/molecules/Avatar";
import UserInfo from "src/components/molecules/UserInfo";
import { number, object, string, TypeOf } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "src/components/atoms/Input";
import Button from "src/components/atoms/Button";
import EditToggleWrapper from "./EditToggleWrapper";
import Textarea from "src/components/atoms/Textarea";
import Select from "src/components/molecules/Select";
import Option from "src/components/atoms/Option";
import { GENDERS } from "src/shared/constants/users";
import { calculateAge } from "src/shared/helpers/date";
import { useUsersStore } from "src/shared/stores/users";
import { Accordion } from "src/components/organisms/Accordion/Accordion";
import clsx from "clsx";
import { useDialog } from "src/shared/stores/dialog";
import { DIALOG_IDS } from "src/shared/constants/dialog";
import DeleteIcon from "src/shared/icons/DeleteIcon";
import EditIcon from "src/shared/icons/EditIcon";
import CloseIcon from "src/shared/icons/CloseIcon";
import CheckIcon from "src/shared/icons/CheckIcon";

interface UserDetailsProps extends IUserStoreData {
    userId: string;
    activeEdit: string | null;
    handleEdit: (editKey: string | null) => void;
};

const numberInCountryValidator = (data: { country: string }) => {
    return !/\d/.test(data.country)
}

const editSchema = object({
    fullName: string().nonempty("Name is required").max(100, "Name must be less than 100 characters"),
    gender: string().nonempty("Select an option for gender"),
    country: string().nonempty("Country is required"),
    age: number({ required_error: "Age is required", invalid_type_error: "Incorrect Age" }).gt(0, "Age must be greater than 0"),
    description: string().nonempty("Description is required").max(3000, "Description must be less than 3000 characters"),
}).refine(numberInCountryValidator, {
    message: "Number not allowed in Nationality",
    path: ["country"]
})

type RegisterEditInputs = TypeOf<typeof editSchema>;


const UserDetails: React.FC<UserDetailsProps> = ({
    userId,
    first: firstName,
    last: lastName,
    gender,
    age,
    picture,
    dob,
    country,
    description,
    activeEdit,
    handleEdit
}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const fullName = `${firstName} ${lastName}`
    const ageFromDob = calculateAge(new Date(dob));
    const isUserAdult = ageFromDob >= 18; // age > 18
    const { users, setUsers } = useUsersStore(({ users, setUsers }) => ({ users, setUsers }))
    const { openDialog, setDialogContent } = useDialog(DIALOG_IDS.DELETE_USER);

    const defaultValues = {
        fullName,
        age: age || ageFromDob,
        description,
        gender,
        country
    };

    const methods = useForm<RegisterEditInputs>({
        resolver: zodResolver(editSchema)
    });

    const {
        watch,
        trigger,
        setValue,
        control,
        reset,
        handleSubmit,
        register,
        formState: { errors, isDirty }
    } = methods;

    const startEditMode = () => {
        if (isUserAdult) {
            setIsEditMode(true)
            handleEdit(userId)
        }
    };

    const stopEditMode = () => {
        setIsEditMode(false);
        handleEdit(null)
    };

    const handleDeleteUser = () => {
        setDialogContent({userId})
        openDialog();
    }

    const onSubmitHandler: SubmitHandler<RegisterEditInputs> = (values) => {
        // update user with new values
        // close edit mode
        const { gender, fullName, ...userValues } = values;
        const name = fullName.split(" ");
        const first = name[0];
        const last = name?.[1] || "";

        let currentUsers = {
            ...users,
            [userId]: {
                ...users[userId],
                ...userValues,
                fullName,
                gender: gender as Genders,
                first,
                last
            }
        };

        stopEditMode();
        setUsers(currentUsers);
    }

    useEffect(() => {
        if (isEditMode) {
            reset(defaultValues);
        }
    }, [isEditMode]);

    const currentAge = watch("age");

    const isAccordionEditActive = !!activeEdit && activeEdit !== userId;

    return (
        <div className={clsx("bg-white transition-all border border-slate-200 rounded-xl", {
            "shadow-lg": isEditMode,
            "shadow-sm": !isEditMode,
        })}>
            <form noValidate autoComplete="off">
                <Accordion.Toggle eventKey={userId} disableToggle={isAccordionEditActive || isEditMode}>
                    <div onClick={(e) => {
                        if (isEditMode || isAccordionEditActive) {
                            e.stopPropagation()
                            e?.nativeEvent?.preventDefault();
                        }
                    }}
                        className={clsx("flex p-4 items-center gap-x-5", {
                            "cursor-pointer": !isEditMode && !isAccordionEditActive
                        })}>
                        {/* Profile Picture */}
                        <Avatar src={picture} alt={fullName} />
                        {/* Name */}
                        <EditToggleWrapper isEditMode={isEditMode}>
                            {{
                                editView: <Input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    error={errors["fullName"]?.message}
                                    {...register("fullName")}
                                />,
                                readView: <Typography as="h3" className="text-2xl font-medium">{fullName}</Typography>
                            }}
                        </EditToggleWrapper>
                    </div>
                </Accordion.Toggle>

                {/* User Info */}
                <Accordion.Content eventKey={userId}>
                    <div className="mt-6 px-4">
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <UserInfo
                                label="Age"
                                text={age?.toString() || ageFromDob.toString()}
                                input={isEditMode && <Input
                                    type="number"
                                    name="age"
                                    placeholder="Enter Age"
                                    error={errors["age"]?.message}
                                    value={currentAge || 0}
                                    onChange={(e) => {
                                        setValue("age", parseInt(e.target.value), { shouldDirty: true })
                                        trigger("age");
                                    }}
                                />} />

                            <UserInfo label="Gender" textClassName="capitalize" text={gender} input={
                                isEditMode &&
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Select gender"
                                            {...field}
                                        >
                                            {GENDERS.map((gender) => (
                                                <Option key={gender} value={gender} className="capitalize">{gender}</Option>
                                            ))}
                                        </Select>
                                    )}

                                />} />
                            <UserInfo
                                label="Country"
                                text={country}
                                input={isEditMode && <Input
                                    type="text"
                                    error={errors["country"]?.message}
                                    placeholder="Enter Country Name"
                                    {...register("country")}
                                />} />
                        </div>
                        <UserInfo
                            label="Description"
                            text={description}
                            input={isEditMode && <Textarea
                                placeholder="Enter Description"
                                rows={4}
                                error={errors["description"]?.message}
                                {...register("description")}
                            />} />
                    </div>


                    <div className="mt-6 px-4 pb-4 flex gap-x-1 justify-end">
                        <EditToggleWrapper isEditMode={isEditMode}>
                            {{
                                editView: <>
                                    <Button type="button" className="bg-transparent border-none" onClick={stopEditMode}><CloseIcon color="#f87171"  /></Button>
                                    <Button type="button" onClick={handleSubmit(onSubmitHandler)} className="bg-transparent border-none" disabled={!isDirty}><CheckIcon color="#22cffe" /></Button>
                                </>,
                                readView: <>
                                    <Button type="button" className="bg-transparent border-none" onClick={handleDeleteUser}><DeleteIcon color="#f87171" /></Button>
                                    {isUserAdult && <Button type="button" className="bg-transparent border-none" onClick={startEditMode}><EditIcon color="#1e318a" /></Button>}
                                </>
                            }}
                        </EditToggleWrapper>

                    </div>
                </Accordion.Content>
            </form>
        </div>
    );
};

UserDetails.displayName = "UserDetails";

export default UserDetails;