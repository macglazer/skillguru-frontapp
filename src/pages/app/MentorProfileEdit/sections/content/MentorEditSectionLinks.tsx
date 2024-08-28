import React from "react";

import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";
import {updateUserSocialLinks} from "@services/mentor/settingMentor.service";
import {MentorData} from "../../MentorProfileEditPage";
import {UserEditSection} from "../../../../../components/_grouped";
import FormInputText from "../../../../../components/_form/FormInputText/FormInputText";

export type MentorEditLinksFormInput = {
    website: string;
    linkedin: string;
    twitter: string;
    github: string;
    dribble: string;
    behance: string;
    youtube: string;
    facebook: string;
    instagram: string;
};


type Props = {
    mentorData: MentorData;
};

const isValidUrl = (url: string, allowEmpty: boolean = true): boolean => {
    if (allowEmpty && url === "") {
        return true;
    }
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
};

export const MentorEditSectionLinks = ({mentorData}: Props) => {
    const {control, formState, handleSubmit, watch} =
        useForm<MentorEditLinksFormInput>({
            defaultValues: {
                website: "",
                linkedin: "",
                twitter: "",
                github: "",
                dribble: "",
                behance: "",
                youtube: "",
                facebook: "",
                instagram: "",
            },
        });

    const inputProps = {
        formState: formState,
        control: control,
        // controllerProps: {rules: {required: "Imię jest wymagane"}},
    };

    const onSubmit = async (data: MentorEditLinksFormInput) => {
        try {
            const mentorSocialLinks: MentorEditLinksFormInput = {
                website: data.website,
                linkedin: data.linkedin,
                twitter: data.twitter,
                github: data.github,
                dribble: data.dribble,
                behance: data.behance,
                youtube: data.behance,
                facebook: data.facebook,
                instagram: data.instagram,

            };
            const response = await updateUserSocialLinks(mentorSocialLinks);
            window.location.reload();

        } catch (error) {
            console.error('Failed to update personal data', error);
        }
    };


    return (
        <UserEditSection
            title="Kontakt"
            subtitle="Gdzie istniejesz w internecie?"
            onClose={() => {
                console.log("onClose");
            }}
            onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.Inputs}>
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.website || "Twoja strona "}}
                    label="Twoja strona"
                    name="website"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.linkedin || "Twój Linkedin "}}
                    label="Linkedin URL"
                    name="linkedin"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.twitter || "Twój X "}}
                    label="Twitter URL"
                    name="twitter"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.github || "Twój GitHub "}}
                    label="Github URL"
                    name="github"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.dribble || "Twój Dribble "}}
                    label="Dribbble URL"
                    name="dribble"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.behance || "Twój Behance "}}
                    label="Behance URL"
                    name="behance"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.youtube || "Twój Youtube "}}
                    label="Youtube URL"
                    name="youtube"
                />
                <FormInputText<MentorEditLinksFormInput>
                    {...inputProps}
                    inputProps={{placeholder: mentorData?.instagram || "Twój Instagram "}}
                    label="Instagram URL"
                    name="instagram"
                />
            </div>
        </UserEditSection>
    );
};
