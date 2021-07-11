import { Profile } from "../interfaces/profile.interface";
import { FatalError, logger } from "../util/logger";
import validUrl = require("valid-url");
import request = require("request");

export class ProfileValidator {
    public static async validateProfile(profile: Profile): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (profile.name == null) {
                logger.error(new FatalError("The name can not be empty"));
            }
            if (profile.team == null) {
                logger.error(new FatalError("The team can not be empty"));
            }
            if (profile.apiToken == null) {
                logger.error(new FatalError("The api token can not be empty"));
            }
            if (!validUrl.isUri(profile.team)) {
                logger.error(new FatalError("The provided url is not a valid url."));
            }
            let options = {
                headers: {
                    authorization: `Bearer ${profile.apiToken}`,
                },
            };
            const url = profile.team.replace(/\/?$/, "/api/cloud");

            request.get(url, options, (err, res) => {
                let body;
                try {
                    body = JSON.parse(res.body);
                } catch (e) {
                    logger.error(new FatalError("The provided team or api key is wrong."));
                    reject();
                }
                if (res.statusCode >= 400 || body.teamDomain == null) {
                    options.headers.authorization = `AppKey ${profile.apiToken}`;
                    request.get(url, options, (err, res) => {
                        if (res.statusCode === 200) {
                            resolve();
                        } else {
                            logger.error(new FatalError("The provided team or api key is wrong."));
                            reject();
                        }
                    });
                } else {
                    resolve();
                }
            });
        });
    }
}
