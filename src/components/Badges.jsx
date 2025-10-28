import React from 'react';

const Badges = () => {
    const badgesData = [
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/18978325",
            title: "The Basics of Google Cloud Compute",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/18984395",
            title: "Get Started with Cloud Storage ",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/18986027",
            title: "Get Started with Pub/Sub ",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19043233",
            title: "Get Started with API Gateway",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19044490",
            title: "Get Started with Looker",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19046820",
            title: "Get Started with Dataplex",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19114458",
            title: "Get Started with Google Workspace Tools",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19116305",
            title: "App Building with AppSheet",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19158100",
            title: "Develop with Apps Script and AppSheet",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19163575",
            title: "Build a Website on Google Cloud",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19233064",
            title: "Set Up a Google Cloud Network",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19234413",
            title: "Store, Process, and Manage Data on Google Cloud - Console",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19292028",
            title: "App Engine: 3 Ways",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19293340",
            title: "Cloud Speech API: 3 Ways",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19318312",
            title: "Monitoring in Google Cloud",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19319163",
            title: "Analyze Speech and Language with Google APIs",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19350865",
            title: "Prompt Design in Vertex AI",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19352788",
            title: "Develop Gen AI Apps with Gemini and Streamlit",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19353172",
            title: "Cloud Run Functions: 3 Ways",
        },
        {
            link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19397972",
            title: "Level 3: Generative AI",
        }
    ];

    return (
        <section id="badges" className="certifications-section">
            <h2 className="animate-on-scroll">Badges</h2>
            <div className="badges-grid">
                {badgesData.map((badge, index) => (
                    <div key={index} className="certificate-card badge-card animate-on-scroll">
                        <a
                            href={badge.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="badge-icon-link"
                        >
                            <div className="badge-icon">
                                <img src="https://media.licdn.com/dms/image/v2/D560BAQFV-ds_iFfVSQ/company-logo_200_200/company-logo_200_200/0/1698660876286?e=2147483647&v=beta&t=GTNf3kD3LVtMJOG8AdTtdqv1aGmSDNC6zHOYBnEWyww"  alt="Badge Icon" style={{ width: '80px', height: '80px' }} />
                            </div>
                        </a>
                        <div className="certificate-info">
                            <h3>{badge.title}</h3>
                            <a
                                href={badge.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="badge-link-button"
                            >
                                View Badge →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Badges;