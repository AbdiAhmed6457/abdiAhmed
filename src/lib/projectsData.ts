export type Project = {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    images?: string[];
    image?: string;
    className?: string;
};

export const projects: Project[] = [
    {
        slug: "jobportal",
        title: "JobPortal — MS Provide",
        description:
            "Full-stack Job Portal enabling companies to register and post roles, and fresh graduates to discover and apply via advanced filters. Includes role-based admin control panels for managing students and recruiters, application workflows, and reporting.",
        tags: ["Next.js", "React", "Node.js", "Postgres", "Docker", "AWS"],
        link: "https://github.com/AbdiAhmed6457/job-portal",
        github: "https://github.com/AbdiAhmed6457/job-portal",
        images: Array.from({ length: 10 }).map((_, i) => `/projects/jobPortal/jobPortal${i + 1}.png`),
        className: "md:col-span-2",
    },
    {
        slug: "muraja",
        title: "Muraja — Ustaz Student Platform",
        description:
            "A complete Ustaz (religious teacher) management platform where students discover and connect with Ustaz based on rating, language, location and schedule. Ustaz can manage students, assign tasks, share availability, message individuals, and view simplified analytics on their dashboard. Beautiful, responsive UI with focus on discoverability and trust.",
        tags: ["Next.js", "React", "Postgres", "Realtime"],
        link: "https://github.com/AbdiAhmed6457/newmuraja",
        github: "https://github.com/AbdiAhmed6457/newmuraja",
        images: [
            "/projects/muraja/muraja0.png",
            "/projects/muraja/muraja00.png",
            "/projects/muraja/muraja1.png",
            "/projects/muraja/muraja2.png",
            "/projects/muraja/muraja3.png",
            "/projects/muraja/muraja4.png",
            "/projects/muraja/muraja5.png",
        ],
        className: "md:col-span-2",
    },
    {
        slug: "cheapdelala",
        title: "CheapDelala — Rental Listings Simplified",
        description:
            "An intuitive rental listings platform where owners post properties with full descriptions, photos and availability. Tenants can search by location, price and features, saving time and effort compared to offline searching.",
        tags: ["Next.js", "React", "Postgres"],
        link: "https://github.com/AbdiAhmed6457/Cheap-Delala",
        github: "https://github.com/AbdiAhmed6457/Cheap-Delala",
        images: ["/projects/others/cheapdelala.png"],
        className: "md:col-span-1",
    },
    {
        slug: "ecommerce",
        title: "Ecommerce — Amazon Clone",
        description:
            "An early learning ecommerce project modeled after Amazon: product listings, cart, checkout and order flow showcasing foundational ecommerce patterns.",
        tags: ["React", "Stripe", "Node.js"],
        link: "https://github.com/AbdiAhmed6457/amazonClone",
        github: "https://github.com/AbdiAhmed6457/amazonClone",
        images: ["/projects/others/ecommerce.png"],
        className: "md:col-span-1",
    },
    {
        slug: "blog",
        title: "Personal Blog",
        description:
            "A lightweight personal blogging platform used to publish thoughts, tutorials and updates — includes markdown support and a simple CMS for quick posts.",
        tags: ["Next.js", "Markdown"],
        link: "https://github.com/AbdiAhmed6457/BlogProject",
        github: "https://github.com/AbdiAhmed6457/BlogProject",
        images: ["/projects/others/blog.png"],
        className: "md:col-span-1",
    },
    {
        slug: "thesocial",
        title: "TheSocial — Mini Social Network",
        description:
            "A full-featured social network with authentication, posting, commenting, liking and scalable backend patterns — demonstrates end-to-end social features and moderation workflows.",
        tags: ["React", "WebSocket", "Node.js"],
        link: "https://github.com/AbdiAhmed6457/bigSocialMed",
        github: "https://github.com/AbdiAhmed6457/bigSocialMed",
        images: ["/projects/others/social.png"],
        className: "md:col-span-1",
    },
];
