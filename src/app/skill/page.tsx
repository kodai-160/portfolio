"use client";
import Image from "next/image";

export default function Skill() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">スキル一覧</h2>
        <p>※勉強中のものも含まれています</p>


        <div className="space-y-6">
          <SkillBlock
            title="Frontend"
            skills={[
              { name: "JavaScript", icon: "javascript.svg" },
              { name: "TypeScript", icon: "typescript.svg" },
              { name: "React", icon: "react.svg" },
              { name: "HTML", icon: "html5.svg" },
              { name: "CSS", icon: "css.svg" },
            ]}
          />
          <SkillBlock
            title="Backend"
            skills={[
              { name: "Node.js", icon: "nodedotjs.svg" },
              { name: "Python", icon: "python.svg" },
              { name: "php", icon: "php.svg" },
              { name: "Java", icon: "java.png" },
              { name: "Go", icon: "go.svg" },
            ]}
          />
          <SkillBlock
            title="Database"
            skills={[
              { name: "MySQL", icon: "mysql.svg" },
              { name: "MongoDB", icon: "mongodb.svg" },
              { name: "SQLite", icon: "sqlite.svg" },
            ]}
          />
          <SkillBlock
            title="Infrastructure"
            skills={[
              { name: "Docker", icon: "docker.svg" },
              { name: "Kubernetes", icon: "kubernetes.svg" },
              { name: "OpenStack", icon: "openstack.svg" },
            ]}
          />
          <SkillBlock
            title="OS"
            skills={[
              { name: "Ubuntu", icon: "ubuntu.svg" },
              { name: "Kali linux", icon: "kalilinux.svg" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function SkillBlock({
  title,
  skills,
}: {
  title: string;
  skills: { name: string; icon: string }[];
}) {
  return (
    <div className="border rounded-xl shadow-md p-4">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className={`flex items-center gap-2 text-sm px-4 py-1 rounded-full shadow-sm ${getSkillColor(
              skill.name
            )}`}
          >
            <Image
              src={`/icons/${skill.icon}`}
              alt={`${skill.name} icon`}
              width={16}
              height={16}
            />
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function getSkillColor(skillName: string) {
  const colors: { [key: string]: string } = {
    JavaScript: "bg-yellow-200 text-yellow-800",
    TypeScript: "bg-blue-200 text-blue-800",
    React: "bg-cyan-200 text-cyan-800",
    HTML: "bg-orange-200 text-orange-800",
    CSS: "bg-blue-100 text-blue-700",
    "Node.js": "bg-green-200 text-green-800",
    Python: "bg-indigo-200 text-indigo-800",
    php: "bg-purple-200 text-purple-800",
    Java: "bg-red-200 text-red-800",
    Go: "bg-sky-200 text-sky-800",
    MySQL: "bg-teal-200 text-teal-800",
    MongoDB: "bg-green-300 text-green-900",
    SQLite: "bg-gray-200 text-gray-800",
    Docker: "bg-blue-200 text-blue-800",
    Kubernetes: "bg-indigo-100 text-indigo-700",
    OpenStack: "bg-rose-200 text-rose-800",
    Ubuntu: "bg-orange-300 text-orange-900",
    "Kali linux": "bg-gray-300 text-gray-900",
  };

  return colors[skillName] || "bg-gray-200 text-gray-800";
}
