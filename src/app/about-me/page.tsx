import { FC } from "react";
type TProps = {};

const AboutMe: FC<TProps> = async (props: TProps) => {
        // return <div>loading...</div>;

    return (
        <div className="py-4">
            <section className="mt-8">
                Đây là Duy
            </section>
        </div>
    );
};

export default AboutMe;
