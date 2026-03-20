FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y software-properties-common \
    && add-apt-repository -y ppa:deadsnakes/ppa \
    && apt-get update && apt-get install -y \
    python3.12 python3.12-venv \
    openssh-server tmux htop \
    curl git sudo iproute2 ca-certificates nano unzip wget jq ripgrep \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/bash -u 1000 vscode

RUN mkdir -p /run/sshd \
    && usermod -aG sudo vscode \
    && echo "vscode ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/vscode \
    && chmod 0440 /etc/sudoers.d/vscode \
    && echo "vscode:vscode" | chpasswd \
    && sed -i 's/^#PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config \
    && sed -i 's/^#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config

RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 1 \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3.12 1
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3

RUN curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to /usr/local/bin
RUN pip install pre-commit

USER vscode
WORKDIR /workspaces

RUN mkdir -p ~/.npm-global ~/.local/bin ~/.local/state \
    && npm config set prefix '~/.npm-global' \
    && echo 'export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc

RUN npm install -g git-cliff @openai/codex @mariozechner/pi-coding-agent @google/gemini-cli
