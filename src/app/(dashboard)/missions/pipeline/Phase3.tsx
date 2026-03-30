"use client"

import { useState } from "react"
import { Syne } from "next/font/google"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

function TaskCard({
  number,
  title,
  done,
  locked,
  children,
}: {
  number: string
  title: string
  done: boolean
  locked: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col gap-5 p-6 border"
      style={{
        backgroundColor: locked ? "#050505" : done ? "#060f06" : "#080808",
        borderColor: locked
          ? "rgb(31,41,55)"
          : done
          ? "rgba(34,197,94,0.4)"
          : "rgba(6,182,212,0.4)",
        borderLeft: locked
          ? "3px solid rgb(31,41,55)"
          : done
          ? "3px solid rgb(34,197,94)"
          : "3px solid rgb(6,182,212)",
        opacity: locked ? 0.45 : 1,
        pointerEvents: locked ? "none" : "auto",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-mono font-bold"
            style={{
              color: locked
                ? "rgb(75,85,99)"
                : done
                ? "rgb(34,197,94)"
                : "rgb(6,182,212)",
            }}
          >
            {number}
          </span>
          <h3 className="text-white text-base" style={{ ...syne.style, fontWeight: 700 }}>
            {title}
          </h3>
        </div>
        <div>
          {done && (
            <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>
              ✓ DONE
            </span>
          )}
          {locked && (
            <span className="text-xs font-mono text-gray-700">⊘ LOCKED</span>
          )}
        </div>
      </div>

      {!locked && <div className="flex flex-col gap-4">{children}</div>}
    </div>
  )
}

function MentorNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 border"
      style={{
        backgroundColor: "#0a0a0a",
        borderColor: "rgba(6,182,212,0.15)",
        borderLeft: "3px solid rgba(6,182,212,0.5)",
      }}
    >
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>
        //
      </span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(75,85,99)" }}>
      {children}
    </p>
  )
}

export function Phase3() {
  const [prereq1Done, setPrereq1Done] = useState(false)
  const [prereq2Done, setPrereq2Done] = useState(false)

  const [task1Done, setTask1Done] = useState(false)
  const [task2Done, setTask2Done] = useState(false)
  const [task3Done, setTask3Done] = useState(false)
  const [task4Done, setTask4Done] = useState(false)

  const [forkUrl, setForkUrl] = useState("")

  const prereqsDone = prereq1Done && prereq2Done
  const allDone = task1Done && task2Done && task3Done && task4Done

  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-3xl text-white tracking-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Your Mission - Containerize Nexus Corp
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            You have diagnosed the problem. Now you are going to fix it - for every developer, every environment, every time.
          </p>
        </div>

        {/* Prerequisites */}
        <div
          className="flex flex-col gap-5 p-6 border"
          style={{
            backgroundColor: "#0a0700",
            borderColor: "rgba(251,146,60,0.3)",
            borderLeft: "3px solid rgb(251,146,60)",
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>
              Before you start
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              This mission requires two tools installed on your machine. Check them off before continuing.
            </p>
          </div>

          {/* Prereq 1 - Docker Desktop */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: prereq1Done ? "rgb(34,197,94)" : "rgb(251,146,60)" }}
              >
                01
              </span>
              <p className="text-white text-sm font-bold" style={syne.style}>
                Docker Desktop installed
              </p>
              {prereq1Done && (
                <span className="text-xs font-mono ml-auto" style={{ color: "rgb(34,197,94)" }}>
                  ✓ READY
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Docker Desktop gives you the Docker engine and CLI on your local machine. It also
              includes a dashboard so you can see running containers and manage images.
            </p>
            <a
              href="https://docker.com/products/docker-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-5 py-2.5 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(251,146,60)", color: "#000", ...syne.style }}
            >
              Download Docker Desktop →
            </a>
            {!prereq1Done && (
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) => { if (e.target.checked) setPrereq1Done(true) }}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: "rgb(251,146,60)" }}
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Docker Desktop is installed and running
                </span>
              </label>
            )}
          </div>

          <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

          {/* Prereq 2 - Git */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: prereq2Done ? "rgb(34,197,94)" : "rgb(251,146,60)" }}
              >
                02
              </span>
              <p className="text-white text-sm font-bold" style={syne.style}>
                Git installed
              </p>
              {prereq2Done && (
                <span className="text-xs font-mono ml-auto" style={{ color: "rgb(34,197,94)" }}>
                  ✓ READY
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Git is the version control system you will use to clone the repository and push your
              changes. Most macOS and Linux machines have it already. On Windows, install Git for Windows.
            </p>
            <a
              href="https://git-scm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-5 py-2.5 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(251,146,60)", color: "#000", ...syne.style }}
            >
              Download Git →
            </a>
            {!prereq2Done && (
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) => { if (e.target.checked) setPrereq2Done(true) }}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: "rgb(251,146,60)" }}
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Git is installed
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Task list - only visible when prerequisites are met */}
        {prereqsDone && <>

        {/* Intro context block */}
        <div
          className="flex flex-col gap-4 p-6 border"
          style={{
            backgroundColor: "#080808",
            borderColor: "rgb(31,41,55)",
            borderLeft: "3px solid rgb(31,41,55)",
          }}
        >
          <div className="flex flex-col gap-1">
            <SectionLabel>The Nexus Corp application</SectionLabel>
            <p className="text-gray-300 text-sm leading-relaxed">
              This is the application that runs Nexus Corp&apos;s order management system. Every
              parcel that gets tracked, every customer order that gets processed, every shipment
              status update - it all goes through this app. When it is down, the business stops.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-sm leading-relaxed">
              Right now, this app lives on one server that Marco set up 2 years ago. Nobody else
              knows how it is configured. There is no staging environment. Developers test on their
              local machines - all with different setups. When Lisa deploys a fix, it sometimes works
              in her environment but breaks on the server. The VSM showed you why: 13 days of pure
              wait time, most of it caused by environment problems.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-sm leading-relaxed">
              Before you can build a pipeline, you need somewhere reliable to deploy to. Before you
              can automate deployments, every environment needs to behave identically. That is what
              this mission fixes. You are not containerizing for fun - you are containerizing because
              it is the prerequisite for everything that comes next.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Fork and clone the Nexus Corp repository" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Why fork instead of clone directly?</span> If you cloned
              the original repo, you could run the code locally - but you couldn&apos;t push your
              changes anywhere. You don&apos;t have write access to someone else&apos;s repo.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Forking creates your own copy of the repo under your GitHub account. You get full
              write access to your fork. You can push freely, experiment, break things, and fix
              them - without touching the original. It&apos;s how open source contribution works too:
              fork, change, open a pull request back.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Step 1 - Fork</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Click the button below to open the repository on GitHub. Hit the <span className="text-white">Fork</span> button
              in the top right. GitHub will create a copy at{" "}
              <span className="text-white font-mono">github.com/your-username/nexus-corp-app</span>.
            </p>
            <a
              href="https://github.com/Criscadinu/nexus-corp-app"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-5 py-2.5 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style }}
            >
              Fork on GitHub →
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Step 2 - Clone your fork</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Once forked, clone your copy to your machine - not the original. Use your own username in the URL.
            </p>
            <pre
              className="text-xs font-mono p-4 overflow-x-auto"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "rgb(156,163,175)",
              }}
            >{`git clone https://github.com/your-username/nexus-corp-app
cd nexus-corp-app`}</pre>
          </div>

          {!task1Done && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                Paste your fork URL to continue
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={forkUrl}
                  onChange={(e) => setForkUrl(e.target.value)}
                  placeholder="https://github.com/your-username/nexus-corp-app"
                  className="flex-1 px-3 py-2 text-sm font-mono text-white outline-none border"
                  style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
                />
                <button
                  onClick={() => { if (forkUrl.includes("github.com")) setTask1Done(true) }}
                  disabled={!forkUrl.includes("github.com")}
                  className="px-5 py-2 text-sm font-bold transition-opacity hover:opacity-80 disabled:opacity-30"
                  style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Write a Dockerfile" done={task2Done} locked={!task1Done}>

          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">What is Docker?</span> Think of a container like a
              shipping container. Before shipping containers, every port loaded cargo differently -
              different cranes, different pallets, different procedures. It was chaos. Then someone
              standardized the box. Now any crane in any port can load any container. Same idea here.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              A Docker container is a standard box for software. Inside it: your app, the exact
              Node version it needs, its dependencies, and its configuration. You can run that box
              on your laptop, on a teammate&apos;s Linux machine, or on a cloud server - and it
              behaves identically. The Dockerfile is the recipe for building that box.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>What to do</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create a file named <span className="text-white font-mono">Dockerfile</span> (no
              extension) at the root of the repo. Use the starter below - it&apos;s mostly complete,
              but you need to add the final command that actually starts the app. Check the{" "}
              <span className="text-white font-mono">package.json</span> in the repo to find the
              right start command.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Dockerfile - with explanation</SectionLabel>
            <pre
              className="text-xs font-mono leading-loose p-4 overflow-x-auto"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "rgb(156,163,175)",
              }}
            >{`# Start from the official Node.js 20 image, Alpine variant.
# Alpine is a minimal Linux distro - the image is ~50MB instead of ~300MB.
FROM node:20-alpine

# Set the working directory inside the container.
# All following commands will run relative to this path.
WORKDIR /app

# Copy only the dependency manifests first.
# This is a performance trick: Docker caches this layer.
# If your code changes but package.json doesn't, npm install
# won't re-run on the next build - saving a lot of time.
COPY package*.json ./

# Install dependencies inside the container.
# This gives the container its own node_modules - isolated
# from anything installed on your host machine.
RUN npm install

# Now copy the rest of the app's source code into the container.
COPY . .

# Tell Docker (and anyone reading) that this app listens on port 3000.
# This does NOT publish the port - that happens in docker-compose.
EXPOSE 3000

# TODO: add the command to start the app
# Hint: look at the "scripts" section in package.json`}</pre>
          </div>

          <MentorNote>
            <p className="text-sm text-gray-400 leading-relaxed">
              The <span className="text-white font-mono">CMD</span> instruction is what runs when the
              container starts. It&apos;s the equivalent of typing a command in your terminal. For a
              Node app with a <span className="text-white font-mono">start</span> script, it would
              look like{" "}
              <span className="text-white font-mono">{`CMD ["npm", "start"]`}</span>. If the app uses{" "}
              <span className="text-white font-mono">node server.js</span> directly, it would be{" "}
              <span className="text-white font-mono">{`CMD ["node", "server.js"]`}</span>. Check the
              repo to know which one applies.
            </p>
          </MentorNote>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                My Dockerfile is complete and{" "}
                <code className="text-cyan-400 font-mono">docker build -t nexus-corp .</code>{" "}
                succeeds
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard
          number="03"
          title="Create a docker-compose.yml with three environments"
          done={task3Done}
          locked={!task2Done}
        >
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">What is docker-compose?</span> Your Dockerfile defines
              one container. But real apps need more than one thing - a database, a cache, maybe a
              worker process. And you often want to run the same app multiple times with different
              config. Docker Compose handles that.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              It&apos;s a single file that describes all your services, their ports, their environment
              variables, and how they connect. Instead of running five{" "}
              <span className="text-white font-mono">docker run</span> commands with long flag lists,
              you run one:{" "}
              <span className="text-white font-mono">docker-compose up</span>. Everything starts.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Why three environments?</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-white">dev</span> - where you write code. Errors are verbose,
              logging is noisy, hot reload might be on. Speed of feedback matters more than
              performance.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-white">test</span> - where automated tests run. Config matches
              production closely. No debug noise. Predictable behavior.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-white">prod</span> - what real users hit. Optimized for
              performance, minimal logging, hardened config. You never want dev behavior leaking
              here.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              By defining all three in one file, anyone on the team can spin up any environment
              with a single command - and they all behave exactly as intended.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>docker-compose.yml starter</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create <span className="text-white font-mono">docker-compose.yml</span> at the repo
              root. The dev service is provided. Add the test and prod services following the same
              pattern - use ports 3001 and 3002, and set{" "}
              <span className="text-white font-mono">NODE_ENV</span> and{" "}
              <span className="text-white font-mono">APP_VERSION</span> appropriately.
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "rgb(156,163,175)",
              }}
            >{`services:
  dev:
    build: .           # build the image from the Dockerfile in this directory
    ports:
      - "3000:3000"    # host port : container port
    environment:
      - NODE_ENV=development
      - APP_VERSION=1.0.0-dev
      - PORT=3000

  # TODO: add the test service
  # PORT 3001, NODE_ENV=test, APP_VERSION=1.0.0-test

  # TODO: add the prod service
  # PORT 3002, NODE_ENV=production, APP_VERSION=1.0.0`}</pre>
          </div>

          <MentorNote>
            <p className="text-sm text-gray-400 leading-relaxed">
              The <span className="text-white font-mono">ports</span> mapping is{" "}
              <span className="text-white font-mono">host:container</span>. The container always
              listens on 3000 internally (because that&apos;s what EXPOSE and PORT say). The left
              side is what port you access from your browser. By using 3000, 3001, and 3002 on the
              host, all three services can run at the same time without colliding.
            </p>
          </MentorNote>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                <code className="text-cyan-400 font-mono">docker-compose up</code> starts all
                three services without errors
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Commit and push to GitHub" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">This step matters more than it seems.</span> Right now,
              the Dockerfile and docker-compose.yml only exist on your machine. The moment you push
              them to your fork, any developer with access to that repo can clone it and run the
              entire app - with correct environments - in under a minute.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              That is the shift. The environment is no longer tribal knowledge in someone&apos;s
              head. It is code. It is versioned. It is reviewable. It is the same for everyone.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commands</SectionLabel>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "rgb(156,163,175)",
              }}
            >{`git add Dockerfile docker-compose.yml
git commit -m "feat: add containerized environments"
git push`}</pre>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Use that exact commit message.{" "}
            <span className="text-white font-mono">feat:</span> is a conventional commit prefix -
            it signals that this is a new feature addition, not a bug fix or refactor. It becomes
            useful when you automate changelogs or versioning later.
          </p>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                My fork on GitHub contains Dockerfile and docker-compose.yml
              </span>
            </label>
          )}
        </TaskCard>

        {/* Success banner */}
        {allDone && (
          <div
            className="flex flex-col gap-5 border p-6"
            style={{
              backgroundColor: "#060f06",
              borderColor: "rgba(34,197,94,0.3)",
              borderLeft: "3px solid rgb(34,197,94)",
            }}
          >
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>
              ✓ Environments established. Nexus Corp now runs identically everywhere.
            </p>
            <a
              href="?fase=4"
              className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
            >
              See your impact →
            </a>
          </div>
        )}

        </> }

      </div>
    </div>
  )
}
