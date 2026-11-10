# Boussole des Énergies Jungiennes

Single-page web app (Vue 3 from CDN, inline CSS/JS), deployed at https://galan.cloud/jung/.

Imported on 2026-11-10 from the live site. Open `index.html` in a browser to run it.

## Deploying

Publishing a GitHub release uploads the site to Infomaniak over SFTP
(`.github/workflows/deploy.yml`). It can also be run by hand from the Actions tab.

Add these in Settings → Secrets and variables → Actions:

| Secret | Value |
| --- | --- |
| `SFTP_HOST` | the Infomaniak SSH/SFTP host |
| `SFTP_USER` | an SSH/FTP user, ideally one limited to the `jung` folder |
| `SFTP_REMOTE_PATH` | the folder served at `/jung/`, as that user sees it |
| `SFTP_PRIVATE_KEY` | a private key made only for this deploy (or use `SFTP_PASSWORD`) |
| `SFTP_PASSWORD` | only if you are not using a key |
| `SFTP_PORT` | optional, defaults to 22 |
| `SFTP_KNOWN_HOSTS` | optional but recommended: output of `ssh-keyscan <host>` |
